/*
Сейчас:
	- два статуса: 'in process' и 'done'
Необходимо:
	- три статуса: 'created', 'in process', 'done'
*/

import { data } from "../constants/data.js";



function changeStatus() {

	console.log(data);
	

	for (let t1 of data) {
		console.log('T1:', 'status:', t1.status, 'start: ', t1.start);
		
		for (let t2 of t1.items) {
			console.log('T2:', 'status:', t2.status, 'start: ', t2.start);

			if (t2.start == '') {
				t2.status = 'created'
			}

			for (let t3 of t2.items) {
				if (t3.start == '') {
					t3.status = 'created'
				}
				
				for (let t4 of t3.items) {
					if (t4.start == '') {
						t4.status = 'created'
					}

					for (let t5 of t4.items) {
						if (t5.start == '') {
							t5.status = 'created'
						}

						for (let t6 of t5.items) {
							if (t6.start == '') {
								t6.status = 'created'
							}
						}
					}
				}
			}
		}
		
	}

}

export const status = changeStatus