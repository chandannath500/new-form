import React, { useState } from 'react';
import { Form, Input, Radio, Button, Modal, message } from 'antd';

const FormPage = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    maritalStatus: '',
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    { label: 'First Name', key: 'firstName', type: 'input' },
    { label: 'Last Name', key: 'lastName', type: 'input' },
    {
      label: 'SSN No.',
      key: 'ssn',
      type: 'ssn',
      rules: [
        {
          required: true,
          message: 'Please provide the SSN number.',
        },
      ],
    },
    { label: 'Marital Status', key: 'maritalStatus', type: 'radio' },
  ];

  const isSSNValid = ssn => /^\d{10}$/.test(ssn);

  const handleNext = () => {
    if (currentQuestion === 2) {
      if (!isSSNValid(formData.ssn)) {
        message.error('Input 10 digits SSN number.');
        return;
      }
    }

    if (!formData[questions[currentQuestion].key]) {
      message.error(`Please provide ${questions[currentQuestion].label}.`);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      ssn: '',
      maritalStatus: '',
    });
    setCurrentQuestion(0);
    onClose();
  };

  const handleSSNInput = e => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length > 10) {
      e.target.value = input.slice(0, 10);
    }
    setFormData({ ...formData, ssn: input });
  };

  return (
    <Modal title="Questionnaire" visible={visible} onCancel={onClose} footer={null}>
      <Form>
        {questions.map((question, index) => (
          index === currentQuestion && (
            <Form.Item
              label={question.label}
              key={question.key}
              rules={question.rules || []}
            >
              {question.type === 'input' && (
                <Input
                  value={formData[question.key]}
                  onChange={e =>
                    setFormData({ ...formData, [question.key]: e.target.value })
                  }
                />
              )}
              {question.type === 'ssn' && (
                <Input
                  type="text"
                  value={formData[question.key]}
                  onChange={handleSSNInput}
                  maxLength={10}
                  placeholder="Enter 10-digit SSN"
                />
              )}
              {question.type === 'radio' && (
                <Radio.Group
                  options={['Married', 'Unmarried']}
                  value={formData[question.key]}
                  onChange={e =>
                    setFormData({ ...formData, [question.key]: e.target.value })
                  }
                />
              )}
            </Form.Item>
          )
        ))}
        {currentQuestion < questions.length - 1 ? (
          <Button
            type="primary"
            onClick={handleNext}
            disabled={
              currentQuestion === 2 && !isSSNValid(formData.ssn)
            }
          >
            Next
          </Button>
        ) : (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default FormPage;
