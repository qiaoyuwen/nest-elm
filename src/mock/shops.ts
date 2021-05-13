import { ShopEntity } from '@/shops/shops.entity';

export const mockShopEntity = new ShopEntity();

export const mockShopsService = { findAll: () => [], findOne: () => mockShopEntity };
