import { useCallback } from 'react';

export default function useFormatInput() {
    const formatInput = useCallback((e, type) => {
        let value = e.target.value;

        // Удаляем все нежелательные символы (в зависимости от типа)
        let cleanedValue;
        switch (type) {
            case 'phone':
                cleanedValue = value.replace(/\D/g, ''); // Только цифры
                break;
            case 'date':
                cleanedValue = value.replace(/\D/g, ''); // Только цифры
                break;
            default:
                cleanedValue = value;
        }

        // Ограничиваем длину (в зависимости от типа)
        let maxLength;
        switch (type) {
            case 'phone':
                maxLength = 11; // +7 (111) 111-11-11
                break;
            case 'date':
                maxLength = 10; // 01.01.2001
                break;
            default:
                maxLength = Infinity;
        }
        const truncated = cleanedValue.slice(0, maxLength);

        // Форматируем значение (в зависимости от типа)
        let formattedValue = truncated;
        switch (type) {
           
            case 'phone':
                if (truncated.length > 0) {
                    // Начинаем с +7 или 8
                    let prefix = truncated.startsWith('8') ? '8' : '+7';
                    let numbers = truncated.slice(1); // Убираем первую цифру (7 или 8)

                    // Форматируем: +7 (111) 111-11-11
                    if (numbers.length > 0) {
                        formattedValue = `${prefix} (${numbers.slice(0, 3)})`;
                        if (numbers.length > 3) {
                            formattedValue += ` ${numbers.slice(3, 6)}`;
                            if (numbers.length > 6) {
                                formattedValue += `-${numbers.slice(6, 8)}`;
                                if (numbers.length > 8) {
                                    formattedValue += `-${numbers.slice(8)}`;
                                }
                            }
                        }
                    } else {
                        formattedValue = prefix; // Только +7 или 8
                    }
                }
                break;
            case 'date':
                if (truncated.length > 8) {
                    formattedValue = `${truncated.slice(0, 2)}.${truncated.slice(2, 4)}.${truncated.slice(4, 8)}`;
                } else if (truncated.length > 4) {
                    formattedValue = `${truncated.slice(0, 2)}.${truncated.slice(2, 4)}.${truncated.slice(4)}`;
                } else if (truncated.length > 2) {
                    formattedValue = `${truncated.slice(0, 2)}.${truncated.slice(2)}`;
                }
                break;
            default:
                formattedValue = truncated;
        }

        // Обновляем значение поля
        e.target.value = formattedValue;
    }, []);

    return formatInput;
};