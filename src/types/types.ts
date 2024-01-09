export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    _v: number,
    key?: string,
    count?: number,
  }

  export type TUser = {
    email: string;
    name: string;
    password: string;
    token?: string;
  }

  export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner?: string;
    status: string;
    updatedAt: string;
    __v?: number;
    _id: string;
  }

  export type TOrderData = {
    name: string;
    order: TOrder;
    success: boolean;
}