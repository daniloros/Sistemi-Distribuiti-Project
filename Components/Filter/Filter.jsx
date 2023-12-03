import React, {useState, useContext} from 'react'
import Image from "next/image";

import Style from './Filter.module.css';
import images from '../../assets';
import {ChatAppContext} from "@/Context/ChatAppContext";
import {Form} from '../index';

const Filter = () => {
    const { account, addFriends } = useContext(ChatAppContext);

    //USESTATE
    const [addFriend, setAddFriend] = useState(false);
    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_right}>
                        <button onClick={() => setAddFriend(true)}>
                            <Image src={images.user} alt="clear" width={20} height={20} />
                            ADD FRIEND
                        </button>
                    </div>
                </div>
            </div>

            {/* //MODEL COMPONENT */}
            {addFriend && (
                <div className={Style.Filter_model}>
                    <Form
                        openBox={setAddFriend}
                        title="AGGIUNGI IL TUO AMICO"
                        info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
                        smallInfo="Kindley Select Your Friend Name & Address.."
                        image={images.hero}
                        functionName={addFriends}
                    />
                </div>
            )}
        </div>
    );
};

export default Filter;