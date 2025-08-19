export default function throwComponentError(error) {
    return {
        status: error?.status || error?.data?.status || 'Ввод',
        message: error?.message || error?.data?.message,
        timestamp: new Date().toISOString(),
        endpoint: window?.location?.href,
    }
}
