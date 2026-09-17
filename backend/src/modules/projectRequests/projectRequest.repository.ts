import crypto from 'crypto';
import { Database } from '../../shared/database';
import { ProjectRequest, ProjectRequestStatus, AdminNote } from './projectRequest.types';

export interface ProjectRequestFilters {
  status?: string;
  serviceType?: string;
  budgetRange?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class ProjectRequestRepository {
  static generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `PR-${year}-${randomHex}`;
  }

  static async create(
    data: Omit<ProjectRequest, 'id' | 'referenceNumber' | 'status' | 'notes' | 'notification' | 'createdAt' | 'updatedAt'>
  ): Promise<ProjectRequest> {
    const now = new Date().toISOString();
    const newRequest: ProjectRequest = {
      ...data,
      id: `pr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
      referenceNumber: this.generateReferenceNumber(),
      status: 'New',
      notes: [],
      notification: {
        ownerStatus: 'pending',
        clientStatus: 'pending',
        retryCount: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    const db = Database.readLocalDb();
    db.projectRequests.unshift(newRequest);
    Database.writeLocalDb(db);

    return newRequest;
  }

  static async findById(id: string): Promise<ProjectRequest | null> {
    const db = Database.readLocalDb();
    const item = db.projectRequests.find((req) => req.id === id || req.referenceNumber === id);
    return item || null;
  }

  static async findMany(filters: ProjectRequestFilters = {}): Promise<{
    items: ProjectRequest[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    stats: Record<string, number>;
  }> {
    const db = Database.readLocalDb();
    let requests: ProjectRequest[] = [...(db.projectRequests || [])];

    // Compute stats across all requests
    const stats: Record<string, number> = {
      total: requests.length,
      New: 0,
      Reviewing: 0,
      'Need More Information': 0,
      'Quote Sent': 0,
      Accepted: 0,
      'In Progress': 0,
      Completed: 0,
      Declined: 0,
      Spam: 0,
    };

    for (const r of requests) {
      if (stats[r.status] !== undefined) {
        stats[r.status]++;
      }
    }

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      requests = requests.filter((r) => r.status.toLowerCase() === filters.status?.toLowerCase());
    }

    if (filters.serviceType && filters.serviceType !== 'all') {
      requests = requests.filter((r) =>
        r.serviceType.toLowerCase().includes(filters.serviceType!.toLowerCase())
      );
    }

    if (filters.budgetRange && filters.budgetRange !== 'all') {
      requests = requests.filter((r) => r.budgetRange === filters.budgetRange);
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      requests = requests.filter(
        (r) =>
          r.referenceNumber.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.contact.name.toLowerCase().includes(q) ||
          r.contact.email.toLowerCase().includes(q)
      );
    }

    const total = requests.length;
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, Math.min(100, filters.limit || 10));
    const totalPages = Math.ceil(total / limit) || 1;

    const startIndex = (page - 1) * limit;
    const items = requests.slice(startIndex, startIndex + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
      stats,
    };
  }

  static async updateStatus(id: string, status: ProjectRequestStatus): Promise<ProjectRequest | null> {
    const db = Database.readLocalDb();
    const index = db.projectRequests.findIndex((r) => r.id === id || r.referenceNumber === id);
    if (index === -1) return null;

    db.projectRequests[index].status = status;
    db.projectRequests[index].updatedAt = new Date().toISOString();
    Database.writeLocalDb(db);

    return db.projectRequests[index];
  }

  static async addNote(id: string, text: string, author: string): Promise<ProjectRequest | null> {
    const db = Database.readLocalDb();
    const index = db.projectRequests.findIndex((r) => r.id === id || r.referenceNumber === id);
    if (index === -1) return null;

    const newNote: AdminNote = {
      id: `note_${Date.now()}`,
      text,
      author,
      createdAt: new Date().toISOString(),
    };

    if (!db.projectRequests[index].notes) {
      db.projectRequests[index].notes = [];
    }

    db.projectRequests[index].notes.unshift(newNote);
    db.projectRequests[index].updatedAt = new Date().toISOString();
    Database.writeLocalDb(db);

    return db.projectRequests[index];
  }
}
