import React from 'react';

const FontOptions = (props) => {
    return(
        <section id="fontoptions">
            <div className="inflex" data-value="700" onClick={ (e) => props.setFontOptions({...props.fontOptions, fontWeight: e.target.dataset.value})}>Bold
            </div>
            <select className="inflex" onChange={ (e) => props.setFontOptions({...props.fontOptions, fontFamily: e.target.value})}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>
            <select className="inflex" onChange={ (e) => props.setFontOptions({...props.fontOptions, fontSize: e.target.value})}>
                <option value="12px">12</option>
                <option value="24px">24</option>
                <option value="36px">36</option>
            </select>
        </section>
    )
}

export default FontOptions