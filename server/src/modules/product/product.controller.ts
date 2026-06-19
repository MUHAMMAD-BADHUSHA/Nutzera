import { Request, Response } from 'express';
import { ProductService } from './product.service';
import {
  createProductSchema,
  updateProductSchema,
} from './product.validation';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const product = await ProductService.createProduct(parsed.data);
    return res.status(201).json({
      message: 'Product created successfully',
      data: product,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Product with this name already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || '';
    const category = (req.query.category as string) || '';
    const isActiveStr = req.query.isActive as string;

    let isActive: boolean | undefined;
    if (isActiveStr === 'true') isActive = true;
    else if (isActiveStr === 'false') isActive = false;

    const result = await ProductService.getProducts({
      page,
      limit,
      search,
      category,
      isActive,
    });

    return res.json({
      message: 'Products fetched successfully',
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await ProductService.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const parsed = updateProductSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const product = await ProductService.updateProduct(id, parsed.data);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Product with this name already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await ProductService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleProductStatus = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await ProductService.toggleStatus(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await ProductService.getCategories();
    return res.json({
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
