
export const sendData = async (inputValue1, inputValue2, inputValue3, setLoading) => {
    try {
        //IP 192.168.57.202   IP 192.168.1.114
        setLoading(true);
        const response = await fetch('http://192.168.1.140:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input1: inputValue1,
                input2: inputValue2,
                input3: inputValue3
            }),
        });

        const responseData = await response.text();
        console.log('Respuesta del servidor:', responseData);
        
        // Simula la rueda de carga durante 2 segundos
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    } catch (error) {
        console.error('Error al enviar datos:', error);
        setLoading(false);
    }
};