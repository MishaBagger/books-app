import Info from "./Info";

export default function User({ userData, logout }) {
    return (
        <section className="user">
            <h1 className="title">Личный кабинет</h1>
            <div className="user__container">
                <Info userData={userData}/>
                <button className="user__button" onClick={logout}>Выйти из аккаунта</button>
            </div>
        </section>
    )
}
