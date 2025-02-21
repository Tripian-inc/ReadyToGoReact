export const iconUrl = (poiIcon = 'Flag', color = 'black2', offer?: boolean) => `https://s3-eu-west-1.amazonaws.com/poi-pics/Icon/${color}/${poiIcon}${offer ? '-Offer' : ''}.png`;

export const getOrderImage = (order: number) => `https://s3-eu-west-1.amazonaws.com/poi-pics/Icon/order/marker-order-${order}.png`;

export const createSvgIcon = (number: number) => {
  if (number > -1) {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
      <circle cx="128" cy="128" r="75" fill="#D6504A" stroke="white" stroke-width="15" />
      <text x="128" y="128" font-size="100" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial" dy="0.35em">${number + 1}</text>
    </svg>
  `;
  }
  return '';
};
