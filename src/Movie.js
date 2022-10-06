import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import './movie.scss'



const MovieList = ({ movie, setMovie, search, setSearch, searchInput, setSearchInput }) => {
    const GO = useNavigate()
    return (
        <>
            <input onChange={(e) => setSearchInput(e.target.value)} /> <button onClick={
                () => { setSearch({ search: searchInput }); GO('/search?search=' + searchInput) }
            }>SEARCH</button>
            <div className='inner'>
                {
                    movie.map(m => {
                        return (
                            <figure key={m.id}>
                                <Link to={'/detail/' + m.id}>
                                    <img src={m.src} alt="" onError={e => e.target.src = process.env.PUBLIC_URL + 'large-cover.jpg'} />
                                    <div className='desc'>{m.title}</div>
                                </Link>

                            </figure>
                        )
                    })
                }
            </div>
        </>

    )
}
const MovieDetail = ({ movie, setMovie }) => {
    const { id } = useParams();
    const matchMovie = movie.find(it => id === String(it.id));
    return (
        <div>
            {
                <figure>
                    <img src={matchMovie.src} alt="" onError={e => e.target.src = process.env.PUBLIC_URL + 'large-cover.jpg'} />
                    <div className='desc'>{matchMovie.title}</div>
                    <div className='desc'>{matchMovie.desc}</div>
                </figure>
            }
        </div>
    )
}

const MovieSearch = ({ movie, setMovie, search, setSearch, searchRe }) => {
    const searchList = movie.filter(it => it.desc.toUpperCase().includes(searchRe?.toUpperCase()) || it.title.toUpperCase().includes(searchRe?.toUpperCase()));
    console.log(searchList)
    return (
        <div className='Movie'>
            {
                <>
                    {
                        searchList.length !== 0 ? searchList.map((m, i) => {
                            return (
                                <figure key={i}>
                                    <Link to={'/detail/' + m.id}>
                                        <img src={m.src} alt="" onError={e => e.target.src = process.env.PUBLIC_URL + 'large-cover.jpg'} />
                                        <div className='title'>{m.title}</div>
                                        <div className='desc'>{m.desc}</div>
                                    </Link>

                                </figure>
                            )
                        })

                            : <div> 없어 없다구...</div>
                    }
                </>

            }
        </div>
    )
}


const Movie = () => {
    const [movie, setMovie] = useState();
    const [search, setSearch] = useSearchParams();
    const searchRe = search.get('search');
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://yts.mx/api/v2/list_movies.json');
            const movie = res.data.data.movies.slice(5, 20).map(m => {
                return {
                    id: m.id,
                    title: m.title_long,
                    src: m.large_cover_image,
                    desc: m.description_full
                }
            });
            console.log(res.data.data.movies)
            setMovie(movie)
        }
        getData();
    }, [])
    return (
        <div className='Movie'>
            {
                movie ?
                    <>
                        <Routes>
                            <Route path='/' element={<MovieList movie={movie} setMovie={setMovie} searchInput={searchInput} setSearchInput={setSearchInput} search={search} setSearch={setSearch} searchRe={searchRe} />} />
                            <Route path='/list' element={<MovieList movie={movie} setMovie={setMovie} searchInput={searchInput} setSearchInput={setSearchInput} search={search} setSearch={setSearch} searchRe={searchRe} />} />
                            <Route path='/detail/:id' element={<MovieDetail movie={movie} setMovie={setMovie} />} />
                            <Route path='/search' element={<MovieSearch movie={movie} setMovie={setMovie} search={search} setSearch={setSearch} searchRe={searchRe} />} />
                        </Routes>

                    </>

                    : <div>로딩 중입니다.</div>
            }
        </div>
    )
}

export default Movie