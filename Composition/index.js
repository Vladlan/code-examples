const compose = (...fns) => {
	// always invoke functions from right to left
	const [fn1, fn2, ...rest] = fns.reverse();
	const composedFn = (...args) => fn2(fn1(...args));
	if (rest.length === 0) return composedFn;
	return compose(...rest.reverse(), composedFn);
};

const words = (str) => String(str)
	.toLowerCase()
	.split(/\s|\b/)
	.filter(function alpha(v) {
		return /^[\w]+$/.test(v);
	});

function unique(list) {
	const uniqList = [];
	list.forEach( item => {
		!uniqList.includes(item) ? uniqList.push(item) : ''
	});
	return uniqList;
}




const text = "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.";

const uniqueWords = compose(unique, words)(text)

console.log(`uniqueWords: `, uniqueWords);
// uniqueWords:  [ 'lorem', 'ipsum', 'dolor', 'sit', 'amet' ]
