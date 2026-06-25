import { Request, Response } from 'express';
import { PageService } from './page.service';
import { createPageSchema, updatePageSchema } from './page.validation';

export const createPage = async (req: Request, res: Response) => {
  try {
    const parsed = createPageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const page = await PageService.createPage(parsed.data);
    return res.status(201).json({
      message: 'Page created successfully',
      data: page,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Page with this slug already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPages = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';

    const result = await PageService.getPages({ page, limit, search, status });

    return res.json({
      message: 'Pages fetched successfully',
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug);
    const page = await PageService.getPageBySlug(slug);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.json({
      message: 'Page fetched successfully',
      data: page,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPageById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const page = await PageService.getPageById(id);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.json({
      message: 'Page fetched successfully',
      data: page,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const parsed = updatePageSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const page = await PageService.updatePage(id, parsed.data);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.json({
      message: 'Page updated successfully',
      data: page,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Page with this slug already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const page = await PageService.deletePage(id);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    return res.json({
      message: 'Page deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPublishedPages = async (_req: Request, res: Response) => {
  try {
    const pages = await PageService.getPublishedPages();
    return res.json({
      message: 'Published pages fetched successfully',
      data: pages,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
