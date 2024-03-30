const headers = {
	createH2: (cl, str) => {
		let h2 = document.createElement('h2')
		h2.classList.add(cl)
		// console.log('str', str)
		h2.textContent = str
	
		return h2
	},
	createH3: (cl, str) => {
		let h3 = document.createElement('h3')
		h3.classList.add(cl)
		h3.textContent = str
	
		return h3
	}
}

export const createH2 = headers.createH2
export const createH3 = headers.createH3