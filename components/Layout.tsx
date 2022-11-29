import React, {FunctionComponent, PropsWithChildren} from 'react';
import styles from "../styles/Layout.module.css";

interface prop {
    children: React.ReactNode;
}

const Layout = (prop: prop): React.ReactElement => {
    return (
        <div className="bg-black h-[100%]">
            <div className='text-white'>
                {prop.children}
            </div>
        </div>
    );
};

export default Layout;
