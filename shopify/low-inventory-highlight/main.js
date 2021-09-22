/* 
 * This script is loaded in a browser exentsion to highlight 
 * products with low available inventory when making a draft order.
 */

window.addEventListener('load', () => {
	let products
	const productClass = '._1skLe'
	const inventoryClass = '._2xM2-'
	
	document.querySelector('#PolarisPortalsContainer').addEventListener('keydown', function (e) {
		console.log('keydown event happened');
		checkForProducts();
	});

	const findProducts = () => {
		const products = document.querySelectorAll(productClass);
		return products;
	};
	
	const checkForProducts = () => {
		let i = 0;
		let interval = setInterval(function() {
			if (findProducts().length) {
				products = findProducts();
				attachProductClasses()
				clearInterval(interval)
			}
		}, 500)
	}

	const attachProductClasses = () => {
		for (let index = 0; index < products.length; index++) {
			const product = products[index];
			const inventoryArea = product.querySelector(inventoryClass)
			if (inventoryArea) {
				const inventoryText = inventoryArea.textContent
				const inventory = inventoryText.split(' ')[0].replace(/,/g, '')

				if (parseInt(inventory) >= 7 && parseInt(inventory) <= 10) {
					product.classList.add('inventory-alert-low')
				}

				if (parseInt(inventory) >= 4 && parseInt(inventory) <= 6) {
					product.classList.add('inventory-alert-medium')
				}

				if (parseInt(inventory) <= 3 ) {
					product.classList.add('inventory-alert-high')
				}
			}
		}
	}
});