import { Request, Response, NextFunction } from 'express';
import { ProjectRequestService } from './projectRequest.service';

export class ProjectRequestController {
  static async submitRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProjectRequestService.createRequest(req.body);
      res.status(201).json({
        success: true,
        data: {
          referenceNumber: result.referenceNumber,
          title: result.request.title,
          createdAt: result.request.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, serviceType, budgetRange, search, page, limit } = req.query;
      const result = await ProjectRequestService.getRequests({
        status: status as string,
        serviceType: serviceType as string,
        budgetRange: budgetRange as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10,
      });

      res.json({
        success: true,
        data: result.items,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
          stats: result.stats,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getRequestById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const request = await ProjectRequestService.getRequestById(id);
      res.json({
        success: true,
        data: request,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const updated = await ProjectRequestService.updateStatus(id, req.body.status);
      res.json({
        success: true,
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addNote(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const author = req.user?.email || 'Nikhil Kumar';
      const updated = await ProjectRequestService.addNote(id, req.body.text, author);
      res.status(201).json({
        success: true,
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }
}
