export const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return item.type === 'bun' ? item.price * 2 + acc : item.price + acc;
    })
}