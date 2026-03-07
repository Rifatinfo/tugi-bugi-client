import { Header } from "@/components/shared/Navbar/Header";


const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <> 
           <Header />
            {children}
        </>
    );
};

export default CommonLayout;