export default function User({logout}) {
    return (
        <div>
            Кабинет юзера
            <button onClick={logout}>Logout</button>
        </div>
    )
}
