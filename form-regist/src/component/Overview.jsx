// src/component/Overview.jsx
import Card from './ui/Card';
import Form from './ui/Form';

export default function Overview(){
    return (
        <div className="w-screen bg-amber-950 flex flex-col items-start py-10">
            {/* <header className="bg-amber-300 w-full flex justify-center">
                <Card className="object-contain"/>
            </header> */}

            <Form/>
        </div>
    );
}
