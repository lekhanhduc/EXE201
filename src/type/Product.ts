// types.ts
export interface ReviewDetailResponse {
}

export interface ProductDetailResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    rentalPricePerDay?: number;
    stockQuantity: number;
    categoryName: string;
    imageUrl: string;
    reviews: ReviewDetailResponse[];
}

export interface PageResponse<T> {
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    data: T[];
}
