import { ProjectRequestRepository, ProjectRequestFilters } from './projectRequest.repository';
import { ProjectRequest, ProjectRequestStatus } from './projectRequest.types';
import { NotificationService } from '../notifications';
import { NotFoundError } from '../../shared/errors';
import { Logger } from '../../shared/logger';

export class ProjectRequestService {
  static async createRequest(data: any): Promise<{
    referenceNumber: string;
    request: ProjectRequest;
  }> {
    const request = await ProjectRequestRepository.create({
      serviceType: data.serviceType,
      projectSize: data.projectSize,
      budgetRange: data.budgetRange,
      title: data.title,
      description: data.description,
      existingSystem: data.existingSystem,
      desiredOutcome: data.desiredOutcome,
      hasDesign: data.hasDesign,
      desiredDeadline: data.desiredDeadline,
      referenceUrl: data.referenceUrl,
      contact: data.contact,
      consent: {
        accepted: true,
        acceptedAt: new Date().toISOString(),
      },
      attachments: data.attachments || [],
      source: data.source,
    });

    Logger.info(`Project request created successfully: ${request.referenceNumber}`, {
      id: request.id,
      email: request.contact.email,
    });

    // Send notifications asynchronously (Persistence before notification principle)
    NotificationService.sendProjectRequestNotifications(request).catch((err) => {
      Logger.error(`Async notification error for ${request.referenceNumber}: ${err.message}`);
    });

    return {
      referenceNumber: request.referenceNumber,
      request,
    };
  }

  static async getRequests(filters: ProjectRequestFilters) {
    return ProjectRequestRepository.findMany(filters);
  }

  static async getRequestById(id: string): Promise<ProjectRequest> {
    const request = await ProjectRequestRepository.findById(id);
    if (!request) {
      throw new NotFoundError(`Project request not found with ID or Reference Number: ${id}`);
    }
    return request;
  }

  static async updateStatus(id: string, status: ProjectRequestStatus): Promise<ProjectRequest> {
    const updated = await ProjectRequestRepository.updateStatus(id, status);
    if (!updated) {
      throw new NotFoundError(`Project request not found with ID: ${id}`);
    }
    Logger.info(`Status updated for request ${updated.referenceNumber} to ${status}`);
    return updated;
  }

  static async addNote(id: string, text: string, author: string): Promise<ProjectRequest> {
    const updated = await ProjectRequestRepository.addNote(id, text, author);
    if (!updated) {
      throw new NotFoundError(`Project request not found with ID: ${id}`);
    }
    Logger.info(`Note added to request ${updated.referenceNumber} by ${author}`);
    return updated;
  }
}
