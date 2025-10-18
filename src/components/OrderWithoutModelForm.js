import { useState, useRef } from 'react';
import { Upload, FileText, User, Phone, Mail } from 'lucide-react';
import { submitCustomOrder } from '../services/api';

const OrderWithoutModelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectDescription: '',
    quantity: 1,
    deadline: ''
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();

      // Add form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Add message field
      formDataToSend.append('message', formData.projectDescription);

      // Add files
      files.forEach((file) => {
        formDataToSend.append('files', file);
      });

      await submitCustomOrder(formDataToSend);

      setSubmitStatus({
        type: 'success',
        message: 'Запит успішно відправлено! Ми розрахуємо вартість та зв\'яжемося з вами найближчим часом.'
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        projectDescription: '',
        quantity: 1,
        deadline: ''
      });
      setFiles([]);

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Помилка при відправці запиту. Спробуйте ще раз.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-inner-forge p-8 metal-border">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
        <div className="w-10 h-10 bg-gradient-to-r from-forge-orange to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-forge-glow">
          <FileText className="w-5 h-5 text-white" />
        </div>
        Замовити за кресленням або фото
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Завантажте ваші файли
          </label>
          <div
            className="group border-2 border-dashed border-forge-steel rounded-2xl p-8 text-center cursor-pointer hover:border-forge-orange transition-all duration-300 hover:bg-forge-metal"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto mb-4 text-gray-500 group-hover:text-forge-orange transition-colors" size={48} />
            <p className="text-gray-300 mb-2 font-medium group-hover:text-forge-orange transition-colors">
              Перетягніть файли або клікніть
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-medium">JPG, PNG, PDF, DXF до 25MB</span>
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf,.dxf"
          />

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-forge-metal p-3 rounded-lg">
                  <span className="text-gray-300 text-sm">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Видалити
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Опишіть ваш проект *
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
            placeholder="Опишіть, що саме вам потрібно, вкажіть розміри, матеріал (якщо знаєте) та інші важливі деталі."
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Кількість</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Бажаний термін</label>
            <input
              type="text"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
              placeholder="Наприклад: 2 тижні"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Ім'я *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
                placeholder="Ваше ім'я"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Телефон *</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
                placeholder="+380 XX XXX XX XX"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 pl-12 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {submitStatus && (
          <div className={`p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}>
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-forge-orange to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-forge-glow-lg transition-all transform hover:scale-105 shadow-forge-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Відправка...' : 'Відправити запит на розрахунок'}
        </button>
      </form>
    </div>
  );
};

export default OrderWithoutModelForm;
