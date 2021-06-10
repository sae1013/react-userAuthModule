// 헬퍼 함수
export const calculateRemaningTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime-currentTime;

    return remainingDuration;
};
