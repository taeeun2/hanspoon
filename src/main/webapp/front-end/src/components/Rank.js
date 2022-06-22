import {
    Card,
    CardBody,
    Table
  } from "reactstrap";
  
  const Rank = (props) => {
    return (
        <div>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                    <tr>
                        {props.dataName}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        1. {props.first}
                    </tr>
                    <tr>
                        2. {props.second}
                    </tr>
                    <tr>
                        3. {props.third}
                    </tr>
                </tbody>
            </Table>
        </div>
    );
  };
  
  export default Rank;
  