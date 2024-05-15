export const iconUrl = (poiIcon = 'Flag', color = 'black2', offer?: boolean) => `https://s3-eu-west-1.amazonaws.com/poi-pics/Icon/${color}/${poiIcon}${offer ? '-Offer' : ''}.png`;

export const getOrderImage = (order: number) => `https://s3-eu-west-1.amazonaws.com/poi-pics/Icon/order/marker-order-${order > 19 ? '' : order}.png`;
