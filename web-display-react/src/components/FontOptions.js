import React from 'react';

const FontOptions = (props) => {
    return(
        <section id="fontoptions">
            <select className="inflex choose_font_style" onChange={ (e) => props.setFontOptions({...props.fontOptions, fontFamily: e.target.value})}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>
            <select className="inflex" onChange={ (e) => props.setFontOptions({...props.fontOptions, fontSize: e.target.value})}>
                <option value="12px">12</option>
                <option value="24px">24</option>
                <option value="36px">36</option>
            </select>
            <label htmlFor="bold_check" id="bold_button">B</label>
            <input type="checkbox" className="inflex" id="bold_check" value="700" 
            onClick={ (e) => e.target.checked 
                ? (props.setFontOptions({...props.fontOptions, fontWeight: e.target.value}),
                  document.querySelector('#bold_button').style.boxShadow = 'inset 1px 1px 1px rgba(0, 0, 0, 0.7)' )
                : (props.setFontOptions({...props.fontOptions, fontWeight: '500'}),
                  document.querySelector('#bold_button').style.boxShadow = '1px 1px 1px rgba(0, 0, 0, 0.7)' )
            } />
        </section>
    )
}

export default FontOptions