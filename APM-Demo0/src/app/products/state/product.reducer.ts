import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface ProductState {
	showProductCode: boolean;
	currentProductId: number | null;
	products: Product[];
	error: string;
}

const initialState: ProductState = {
	showProductCode: true,
	currentProductId: null,
	products: [],
	error: ''
};

export function reducer(state = initialState, action: ProductActions): ProductState {
	switch (action.type) {
		case ProductActionTypes.ToggleProductCode:
			return {
				...state,
				showProductCode: action.payload
			};

		case ProductActionTypes.SetCurrentProduct:
			return {
				...state,
				currentProductId: action.payload.id
			};

		case ProductActionTypes.ClearCurrentProduct:
			return {
				...state,
				currentProductId: null
			};

		case ProductActionTypes.InitializeCurrentProduct:
			return {
				...state,
				currentProductId: 0
			};

		case ProductActionTypes.LoadSuccess:
			return  {
				...state,
				products: action.payload,
				error: ''
			};

		case ProductActionTypes.LoadFail:
			return {
				...state,
				products: [],
				error: action.payload
			}

		case ProductActionTypes.UpdateProductSuccess:
			const updatedProducts = state.products.map(
				item => action.payload.id === item.id ? action.payload : item
			);
			return {
				...state,
				products: updatedProducts,
				error: ''
			};

		case ProductActionTypes.UpdateProductFail:
			return {
				...state,
				error: action.payload
			}

		case ProductActionTypes.DeleteProductSuccess:
			const idx = state.products.findIndex(x => x.id === action.payload);
			const cleanedProducts = [...state.products.slice(0, idx), ...state.products.slice(idx + 1)]
			return {
				...state,
				products: cleanedProducts,
				currentProductId: null,
				error: ''
			}
		
		case ProductActionTypes.CreateProductSuccess:
			return {
				...state,
				products: [...state.products, action.payload],
				currentProductId: null,
				error: ''
			}
		
		case ProductActionTypes.CreateProductFail:
			return {
				...state,
				error: action.payload
			}

		default:
			return state;
	}
}
