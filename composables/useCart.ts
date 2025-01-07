import Swal from 'sweetalert2';
import { navigateTo } from "nuxt/app";
import {
	computed,
	onBeforeMount
} from 'vue';

export default () => {
	let cart = useState(() => []);
	const isCartOpen = useState(() => false);

	const toggleCart = () => {
		isCartOpen.value = !isCartOpen.value;
	};

    const totalPrice = computed(() => {
        let totalValue = 0;
        for (const item of cart.value) {
            if (item.preco_por_quilo) {
                const precoPorGrama = item.valor/1000
                totalValue += item.quantity * precoPorGrama;
            } else {
                totalValue += item.valor * item.quantity;
            }
        }
        return totalValue;
    });

	const getCart = () : any => {
		return JSON.parse(localStorage.getItem('cart')) ?? {};
	};

	const atualizaCart = () : any => {
		cart.value = JSON.parse(localStorage.getItem('cart')) ?? {};
	};

	const getReqCode = () : any => {
		let reqCodeVar = JSON.parse(localStorage.getItem('reqCode')) ?? false;

		if (!reqCodeVar) {
			reqCodeVar = Math.floor(Math.random() * 99999)

			localStorage.setItem('reqCode', JSON.stringify(reqCodeVar));
		}

		return reqCodeVar
	};

	const setReqCode = (reqCode) : any => {
		return	localStorage.setItem('reqCode', JSON.stringify(reqCode));
	};

	const setCart = (data) => {
		localStorage.setItem('cart',
			JSON.stringify(data)
		);

		cart.value = data;
	};

	const limparCarrinho = () : any => {
		localStorage.removeItem('cart');
		cart.value = [];
	};


	onBeforeMount(() : void => {
		cart.value = getCart();
	});

	return {
		cart,
		isCartOpen,
		totalPrice,
		getCart,
		atualizaCart,
		getReqCode,
		setReqCode,
		setCart,
		limparCarrinho,
		toggleCart,
	}
}
