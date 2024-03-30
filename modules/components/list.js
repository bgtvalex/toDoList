const list = {
	createUl: (cl, tree) => {
		let ul = document.createElement('ul')
		ul.classList.add(cl)
		if (tree !== undefined) {
			ul.classList.add(tree)
		}
	
		return ul
	},
	createLi: (obj) => {
		let li = document.createElement('li')
		li.classList.add(obj.type + '-wrapper')
		if (obj.status === 'done') {
			li.classList.add('checked')
		}
		li.id = obj.id
	
		return li
	}

}

export const createUl = list.createUl
export const createLi = list.createLi