
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

const array = []

async function getData() {
    for (let i = 1; i <= 100000; ++i){
        await sleep(2)
        array.push({
            id: i,
            name: `Name ${i}`,
            status: i % 7 ? 'Active' : 'Inactive'
        })
    }
}

getData()

export const data = array