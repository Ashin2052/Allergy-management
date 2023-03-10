import React, {useEffect, useRef, useState} from "react";
import {
    Typography,
    Avatar,
    Button,
    Col,
    Row,
    Popconfirm,
} from "antd";
import {EyeOutlined, PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import {createAllergy, editAllergy, fetchAllergies, removeAllergy} from "../../shared/reducers/allergy-reducer";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux.hooks";
import {ColumnsType} from "antd/es/table";
import TableComponent from "../../shared/ui/table/dataTable";
import {IAllergy} from "../../types/allergy.types";
import {AllergyForm} from "./allergy-form";

const {Title} = Typography;

const AllergyList = () => {
    const allergy = useAppSelector((state) => state.allergy);
    const [showCartForm, setShowCartForm] = useState(false);
    const [selectEditAllergy, setSelectEditAllergy] = useState<any>();
    const dispatch = useAppDispatch();
    const tableRrf = useRef<any>();

    useEffect(() => {
        getAllergies().then(r => {
        });
    }, []);

    const showHideFormHandler = () => {
        setShowCartForm(!showCartForm);
    }
    const getAllergies = async () => {
        try {
            await dispatch(fetchAllergies());
        } catch (err) {
            return;
        }
    };

    const onEdit = async (value: any) => {
        await setSelectEditAllergy(value);
        tableRrf?.current?.openModal();
    }

    const handleDelete = async (id: string) => {
        try {
            dispatch(removeAllergy(id));
            getAllergies();
        } catch (error) {
            return;
        }
    };

    const practitionerColumn: ColumnsType<IAllergy> = [
        {
            dataIndex: "id",
            key: "id",
            width: "0px",
            render: () => ''
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "100px",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Severity",
            dataIndex: "severity",
            key: "severity",
        },
        {
            title: "Symptoms",
            dataIndex: "symptoms",
            key: "symptoms",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (value: any) => {
                return <Avatar src={value}/>;
            },
        },
        {
            title: "",
            key: "Actions",
            width: "300px",
            render: (value: IAllergy) => {
                return (
                    <>
                        <Popconfirm
                            title="Are you sure you want to delete?"
                            onConfirm={() => handleDelete(value.id!)}
                        >
                            <Button
                                style={{marginLeft: "20px"}}
                                type="primary"
                                icon={<DeleteOutlined/>}
                                danger
                            >
                                Delete
                            </Button>
                        </Popconfirm>

                        <Button
                            style={{marginLeft: "20px"}}
                            type="primary"
                            icon={<EyeOutlined/>}
                            onClick={() => onEdit(value)}

                        >
                            Edit
                        </Button>
                    </>
                );
            },
        },
    ];

    const onsubmitForm = async (values: IAllergy) => {
        try {
            tableRrf.current.closeModal();
            const formData = new FormData();
            formData.append('name', values.name);
            if (values.image[0]) {
                formData.append('image', values.image[0].originFileObj);
            }
            formData.append('severity', values.severity);
            formData.append('symptoms', values.symptoms);
            formData.append('description', values.description);
            if (values?.id) {
                await dispatch(editAllergy({formData, id: values.id}))
            } else {
                await dispatch(createAllergy(formData));
            }
            getAllergies().then(r => {
            })

        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className={'page-container'}>
            <Row
                justify="space-between"
                align="middle"
                style={{marginBottom: "24px"}}
            >
                <Col span={4}>
                    <Title
                        level={2}
                    >
                        Allergy List
                    </Title>
                </Col>
                <Col span={3}>
                    <Button
                        type="primary"
                        style={{width: "100%"}}
                        icon={<PlusOutlined/>}
                        onClick={() => tableRrf?.current?.openModal()}
                    >
                        Register Allergy
                    </Button>
                </Col>
            </Row>
            <AllergyForm allergy={selectEditAllergy}
                         afterClose={() => {
                             setSelectEditAllergy(null)
                         }}
                         ref={tableRrf}
                         onSubmit={onsubmitForm}/>
            <TableComponent
                columns={practitionerColumn}
                dataSource={allergy.data.allergies.map((value, index) => {
                    return {...value, key: index};
                })}/>
        </div>
    );
};

export default AllergyList;