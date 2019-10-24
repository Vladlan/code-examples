let data = { a: 5, b: 2 };

const handler = () => {
    data.square = data.a * data.b // Here is a dependency. That's why we invoking addSubscriber() in getter
}

function createWatcher(data, handler) {
    let target = null;

    class Dependency {
        constructor() {
            this.subscribers = []
        }
        addSubscriber() {
            if (target && !this.subscribers.includes(target)) {
                this.subscribers.push(target)
            }
        }
        notify() {
            this.subscribers.forEach(sub => sub())
        }
    }
    
    
    function addDependency(observable) {
        Object.keys(observable).forEach((key) => {
            let internalValue = observable[key];
            const dependency = new Dependency();
    
            Object.defineProperty(observable, key, {
                get() {
                    dependency.addSubscriber();
                    return internalValue;
                },
                set(newValue) {
                    internalValue = newValue;
                    dependency.notify(); // after change run subscribers
                },
            });
        });
    };
    
    addDependency(data);
    
    function addWatcher(onChangeHandler) {
        target = onChangeHandler;
        target();
        target = null
    };
    
    addWatcher(handler);
}

createWatcher(data, handler);


console.log(`data.square: `, data.square); // data.square:  10
data.a = 6;
console.log(`data.square: `, data.square); // data.square:  12
data.a = 7;
console.log(`data.square: `, data.square); // data.square:  14
data.b = 3;
console.log(`data.square: `, data.square); // data.square:  21
data.b = 4;
console.log(`data.square: `, data.square); // data.square:  28
