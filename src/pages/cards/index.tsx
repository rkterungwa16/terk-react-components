import { Card } from "../../components/card/Card";
import { CardBody } from "../../components/card/CardBody";
import { CardHeader } from "../../components/card/CardHeader";
import { CardHeaderText } from "../../components/card/CardHeaderText";
import { CardIcon } from "../../components/card/CardIcon";
import { Img } from "../../components/img/Img";
import Layout from "../../components/layout/Layout";
import { SvgIcon } from "../../components/svg/SvgIcon";
import { UploadIcon } from "../../icons/UploadIcon";

export const Cards = () => {
  return (
    <Layout>
      <Card colors={{ background: { name: "gray", shade: 100 } }} rounded={5}  className="terkui-my-lg">
        <CardHeader>
          <CardIcon
            size="2xl"
            border={{
              color: { name: "gray", shade: 300 },
              style: "solid",
              width: 1,
            }}
            className="terkui-mr-lg"
          >
            <SvgIcon size="xl" width={46} height={46} viewBox="0 0 46 46">
              <UploadIcon />
            </SvgIcon>
          </CardIcon>
          <div className="terkui-flex terkui-flex-column">
            <CardHeaderText
              component="h5"
              colors={{ text: { name: "gray", shade: 900 } }}
            >
              Upload files
            </CardHeaderText>

            <CardHeaderText
              component="h6"
              colors={{ text: { name: "gray", shade: 500 } }}
            >
              Select and upload the files of your choice
            </CardHeaderText>
          </div>
        </CardHeader>
      </Card>

      <Card
        border={{
          color: { name: "gray", shade: 300 },
          width: 1,
          style: "solid",
        }}
        rounded={5}
        className="terkui-my-lg"
      >
        <CardHeader>
          <CardIcon
            size="2xl"
            border={{
              color: { name: "gray", shade: 300 },
              style: "solid",
              width: 1,
            }}
            className="terkui-mr-lg"
          >
            <SvgIcon size="xl" width={46} height={46} viewBox="0 0 46 46">
              <UploadIcon />
            </SvgIcon>
          </CardIcon>
          <div className="terkui-flex terkui-flex-column">
            <CardHeaderText
              component="h5"
              colors={{ text: { name: "gray", shade: 900 } }}
            >
              Upload files
            </CardHeaderText>

            <CardHeaderText
              component="h6"
              colors={{ text: { name: "gray", shade: 500 } }}
            >
              Select and upload the files of your choice
            </CardHeaderText>
          </div>
        </CardHeader>
        <CardBody padding={{ p: "lg" }}>
          Compressing objects: 100% (8/8), done.
        </CardBody>
      </Card>

      <div style={{
        width: "300px",
        height: "500px"
      }}>
        <Card
        border={{
          color: { name: "gray", shade: 300 },
          width: 1,
          style: "solid",
        }}
        rounded={5}
        className="terkui-my-lg"
      >
        <Img style={{ objectFit: "contain", width: "300px"}} rounded={5} src="https://res.cloudinary.com/doy0uyv63/image/upload/v1694803058/public/content/images/variant/ekty6askqpjjonb8zjcu.jpg" />
      </Card>
      </div>

    </Layout>
  );
};

export default Cards;
