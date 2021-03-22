import React, { useState } from 'react';

const Blog = (props) => {
    const [fontOptions, setFontOptions] = useState({fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'})
    const [testBlog, setTestBlog] = useState(
        {
            headline: 'Headline',
            text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus, lacus in fringilla laoreet, nulla diam imperdiet sem, ac laoreet ex turpis vitae tellus. Donec in mi at sem suscipit pellentesque. Integer sed lorem interdum ligula placerat eleifend eu eu lorem. Nam non nisi nec neque tristique volutpat. Integer sed bibendum ipsum. Donec non pharetra ligula, luctus posuere nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus.Sed efficitur ante risus, varius cursus neque mattis vitae. In hac habitasse platea dictumst. Proin quis interdum nibh, id efficitur nulla. Duis ornare interdum nibh ut tempus. Curabitur sit amet lacinia eros, at fermentum diam. Integer bibendum commodo porta. Sed condimentum nisl in elementum tempor. Sed vulputate quis enim sed malesuada. Vestibulum porta volutpat ipsum, et gravida nisi hendrerit faucibus. Etiam ac convallis dui, in feugiat elit. Suspendisse posuere consectetur augue, ac elementum metus pellentesque lobortis. Vivamus sagittis id orci vitae egestas. Praesent eleifend quis dolor sit amet vulputate.Aenean quis risus dui. Nulla ultrices magna et arcu dictum, at mollis erat feugiat. Quisque ut luctus neque, a interdum diam. Nunc efficitur, risus in fringilla interdum, arcu sem dictum purus, in accumsan erat ligula vel felis. Vivamus non nisi non mauris sagittis tempus ut id dolor. Ut eleifend sapien eget elit lobortis, lacinia aliquet erat euismod. Fusce aliquam ligula eu leo dapibus, vestibulum tincidunt mi consequat. Fusce magna tortor, feugiat quis quam sit amet, gravida facilisis libero.',
            media: 'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg'
        }
    )
    return (
        <div className="blog_modal" 
            style={{...fontOptions,display: 'flex',width: `clamp(400px,${props.entry.text.length}px / 2,80vw)`}} 
            onClick={e => e.stopPropagation()}
        >
            <section>
                <h1 className="preview_headline">{props.entry.headline}</h1>
                <img src={props.entry.media} className="preview_blog_image" alt="" style={{width: `clamp(100px,${props.entry.text.length}px / 5,20vw)`}}/>
                <p>{props.entry.text}</p>
            </section>
            <p className="close_entry_modal" 
                onClick={ () => {
                    document.querySelector('.entry_modal').style.display = 'none'
                    props.setShowEntry(false)
                }}>
                    Stäng
            </p>
        </div>
    )
}

export default Blog