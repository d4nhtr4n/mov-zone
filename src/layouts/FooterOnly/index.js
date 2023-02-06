import Footer from "./Footer";

function DefaultLayout({ children }) {
    return (
        <div>
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
