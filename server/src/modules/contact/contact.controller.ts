import { Request, Response } from 'express';
import { ContactMessageService } from './contact.service';
import { createContactMessageSchema } from './contact.validation';

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const parsed = createContactMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const message = await ContactMessageService.createMessage(parsed.data);
    return res.status(201).json({
      message: 'Message sent successfully',
      data: message,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';

    const result = await ContactMessageService.getMessages({ page, limit, search, status });

    return res.json({
      message: 'Messages fetched successfully',
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getContactMessageById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const message = await ContactMessageService.getMessageById(id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({
      message: 'Message fetched successfully',
      data: message,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const message = await ContactMessageService.markAsRead(id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({
      message: 'Message marked as read',
      data: message,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const message = await ContactMessageService.deleteMessage(id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({
      message: 'Message deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
