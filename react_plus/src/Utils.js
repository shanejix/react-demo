let Utils = {
    uuid: () => {
        let random;
        let uuid = '';

        for (let i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 18) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);

        }
        return uuid;
    },
    pluralize: ( count,word) => {
        return count === 1 ? word : word + 's';
    },

    store: (namespace,data) => {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }
        let store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    },
    extend: (...arg) => {
        let newobj = {};
        for (let i = 0; i < arg.length; i++){
            let obj = arg[i];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newobj[key] = obj.key;
                }
            }
        }
        return newobj;
    }

}
// console.log(Utils.uuid());
export default Utils;