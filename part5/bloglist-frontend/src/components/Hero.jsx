


const Hero = ({value, change}) =>{

    return (
         <div className="hero_blog">
            <div className="container_primary">
                <div className="content_hero">
                <h1 className="title_hero">descouvre read blogs</h1>
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa earum soluta reprehenderit
                dolor sit amet consectetur adipisicing elit. Culpa earum soluta reprehenderit.</p>
                <div className="box_search">
                    <input type="text" className="input_search" name="search" placeholder='search a blog ...' value={value} onChange={change}/>
                    <button className="btn_search" type=''>
                        search
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Hero