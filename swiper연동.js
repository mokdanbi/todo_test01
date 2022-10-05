import logo from './logo.svg';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller } from 'swiper';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';

const url = 'https://api.github.com/users';

function App() {
    const [users, setUsers] = useState([]);

    const gallerySwiperRef = useRef(null);
    const thumbnailSwiperRef = useRef(null);

    // url주소 가져오기 
    const getUsers = async () => {
        const response = await fetch(url);
        const users = await response.json();
        setUsers(users);
    };

    // [] = 사용하지 않으면 데이터가 무한으로 reload된다. 
    useEffect(() => {
        getUsers();
    }, []);


    useEffect(() => {

        const gallerySwiper = gallerySwiperRef.current.swiper;
        const thumbnailSwiper = thumbnailSwiperRef.current.swiper;

        if (gallerySwiper.controller && thumbnailSwiper.controller
        ) {
            gallerySwiper.controller.control = thumbnailSwiper;
            thumbnailSwiper.controller.control = gallerySwiper;
        }
    }, []);


    return (
        <div className="App">
            <Swiper modules={[Controller]} className='ddd' ref={thumbnailSwiperRef}>
                {
                    users.map((user, idx) => {
                        return (
                            <SwiperSlide key={idx} className="itm">
                                <figure>{user.login}</figure>
                            </SwiperSlide>
                        )

                    })
                }
            </Swiper>

            <Swiper modules={[Controller]} className='ccc' ref={gallerySwiperRef}>
                {
                    users.map((user, idx) => {
                        return (
                            <SwiperSlide key={idx} className="itm">
                                <img src={user.avatar_url} alt={user.login} style={{ width: '10%' }} />
                            </SwiperSlide>
                        )

                    })
                }
            </Swiper>
        </div>
    );
}

export default App;
