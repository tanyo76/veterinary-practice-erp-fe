import { IFormLayoutProps } from "../../types/component-props/form-props";
import '../../styles/form-layout.scss';

const FormLayout = ({ children, heading, subHeading }: IFormLayoutProps) => {
  return (
    <div className="signInPageContainer">
      <div className="signInFormContainer">
        <div className="signInPageContent">
          <h3>&#x1F436; VetMasters</h3>
          <div className="signInInfo">
            {heading && <h2>{heading}</h2>}
            {subHeading && <p>{subHeading}</p>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
