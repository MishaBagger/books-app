export default function Info({ userData }) {
    return (
        <>
            <h2 className="subtitle subtitle--cabinet text--cabinet">
                Информация о пользователе
            </h2>
            <p className="text text--cabinet">
                Здравствуйте, {userData.username}
            </p>
            <p className="text text--cabinet">
                Электронная почта: {userData.email}
            </p>
            <p className="text text--cabinet">Телефон: {userData.phone}</p>
            <p className="text text--cabinet">UUID: {userData.uuid}</p>
        </>
    )
}
