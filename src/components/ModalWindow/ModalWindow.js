import "./ModalWindow.scss"
import {Image, Input} from "../index";
export const ModalWindow = props => {
    const cls = ["ModalWindow"];
    if(props.className) cls.push(props.className);

    let secondInput;
    if(props.secondInput)
    {
        secondInput = ( <div><Input onChange={props.secondInputChange} placeholder={props.secondInputPlaceholder} text=""/> <br/> </div>
        );
    }

        return (
            <div className="dm-overlay" id="win1">
                <div onClick="" className="dm-table">
                    <div className="dm-cell">
                        <div className="dm-modal">
                            <a onClick={props.closeClick} id="close_btn" className="close"/>
                            <h3 style={{width:"100%"}}>{props.title}</h3>
                            <br/>
                            <p>{props.text}</p>
                            <br/>
                            <Input onChange={props.changeInput} placeholder={props.placeholder} text=""/>
                            <br/>
                            {secondInput}

                            <button className="button" onClick={props.newDesk} value="ff">Продолжить</button>
                        </div>
                    </div>
                </div>
            </div>
        );

}