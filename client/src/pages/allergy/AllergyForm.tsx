import {Field, Formik, FormikHelpers, FormikValues} from "formik";
import * as Yup from 'yup';
import {IAllergy, severityEnum} from "../../types/allergy.types";
import {
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    TimePicker,
    Upload,
    notification,
    UploadFile, Select,
} from "antd";
import {
    UserOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {checkIfStringContainsSpaceInStartAndEnd} from "../../shared/utils/shared.utils";
import {RcFile} from "antd/es/upload";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../shared/hooks/redux.hooks";
import {isEmpty} from "../../shared/utils/string";


export const AllergyForm = (props: any) => {
    const severities = Object.keys(severityEnum);
    const [fileList, setFileList] = useState<Array<FileList>>([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const practitioners = useAppSelector((store) => store.allergy);
    const [edit, setEdit] = useState(false);


    useEffect(() => {
        handleEdit();
    }, []);

    const handleEdit = () => {
        if (props.allergy) {
            let allergy = props.allergy;


            form.setFieldsValue({
                name: allergy.name,
                severity: allergy.severity,
                symptoms: allergy.symptoms,
                description: allergy.description,
                image: allergy.image

            })
        }
    }


    const handleOnChangeImage = async (file: any) => {
    };
    const onFinish = async (values: IAllergy) => {
        props.onSubmit(values)
    }

    const handlePreview = async (file: UploadFile) => {
        console.log(file,'fiel')
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile as Blob);
                reader.onload = () => resolve(reader.result as string);
            });
        }

        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onRemove = (_file: UploadFile) => {
        // setFileList(fileList.filter((item) => item?.status === "removed"));
    };


    return (
        <Card>
            { handleAllergyForm(
                loading,
                form,
                edit,
                onFinish,
                handleOnChangeImage,
                handlePreview,
                fileList,
                onRemove,
            )}
        </Card>
    )
}


const handleAllergyForm = (
        loading: boolean,
        form: any,
        edit: boolean,
        onFinish: any,
        onChangeImage: any,
        handlePreview: any,
        fileList: any,
        handleRemove: any,
    ) => {
        return (
            <Form
                form={form}
                name="practitioner-form"
                onFinish={onFinish}
                layout={"vertical"}
            >
                <Row>
                    <Col>
                        <Form.Item
                            name="image"
                            getValueFromEvent={(e) => {
                                console.log(e, 'event')
                                if (Array.isArray(e)) {
                                    return e;
                                }
                                return e && e.fileList;
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please upload a image",
                                },
                            ]}
                        >
                            <Upload
                                name="image"
                                accept="image/*"
                                fileList={fileList}
                                listType="picture-card"
                                maxCount={1}
                                beforeUpload={() => false}
                                onPreview={handlePreview}
                                onRemove={handleRemove}
                                onChange={(file: any) => onChangeImage(file)}
                            >
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{width: "50%"}}
                    gutter={[16, 16]}
                    align="middle"
                    justify="space-between"
                >
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Allergy Name"
                            rules={[
                                {required: true, message: "Please input Allergy name!"},
                            ]}
                            hasFeedback={true}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                placeholder="Allergy Name"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {required: true, message: "Please enter description!"},
                                {min: 10, message: "MInimum 10 words!"},
                                {max: 1000, message: "Maximim 1000 words!"},
                            ]}
                            hasFeedback={true}
                        >
                            <Input.TextArea
                                placeholder="Description"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{width: "50%"}}
                    gutter={[16, 16]}
                    align="middle"
                    justify="space-between"
                >
                    <Col span={12}>
                        <Form.Item
                            name="severity"
                            label="Severity"
                            rules={[
                                {required: true, message: "Please enter severity!"},
                                {
                                    message: "Please enter severity",
                                }
                            ]}
                            hasFeedback={true}
                        >
                            <Select placeholder="Select severity">
                                {
                                    Object.keys({...severityEnum}).map((value: any, i) => {
                                        return <Select.Option key={i}
                                                              value={severityEnum[value as keyof severityEnum]}>{value}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="symptoms"
                            label="symptoms"
                            rules={[
                                {required: true, message: "Please enter symptoms!"},
                            ]}
                            hasFeedback={true}
                        >
                            <Input.TextArea
                                placeholder="Symptoms"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={3}>
                        <Button type="primary" loading={loading} htmlType="submit">
                            {edit ? "Edit" : "Add"} Practitioner
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
;