const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    },
    circularReference1 = {
        m: 10,
        n: 10,
    },
    circularReference = {
        a: 10,
        b: 5,
        c: circularReference1
    };
circularReference1['l'] = circularReference['c'];
console.log(JSON.stringify(circularReference, getCircularReplacer()));