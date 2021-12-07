import React from 'react'
import './MainContent.css';

export const MainContent = () => {
    // const [createNodeModalOpen, setCreateNodeModalOpen] = useState(false)


    return (
        <div className="container">
            <div className="main-title">
                hiking w the bois
            </div>
            
            <button className="float">+</button>

            {/* <CreateNodeModal
            isOpen={createNodeModalOpen}
            onClose={() => setCreateNodeModalOpen(false)}

            /> */}
            
        </div>
    );
}