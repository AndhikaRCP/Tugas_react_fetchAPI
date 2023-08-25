import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [api, setAPI] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://strapi-rygs.onrender.com/api/prodis');
      setAPI(res.data.data[0].attributes.prodi[0]);
    };

    fetchData();
  }, []);

  return (
    <div className='mx-4 '>
      {api.map((prodi) => (

        <div key={prodi.kode_prodi} >
          <p className="d-block text-black shadow text-center mt-1">{prodi.nama_prodi}</p>
          <p>Kepala : {prodi.kepala_prodi}</p>
          {prodi.sektretaris ? <p>Sekretaris : {prodi?.sektretaris}</p> : null}

          {prodi.mahasiswa.map((mahasiswa) => (
            <div key={mahasiswa.tahun_masuk}>
              {/* <br /> */}
              Angkatan : {mahasiswa.tahun_masuk}
              {Object.keys(mahasiswa.data).map((item) => (
                <div key={item}>
                  {/* <br/> */}
                  <p className='mt-4 md-4'> kelas : {item}</p>
                  <table className='table table-striped' border={'1px'}>
                          <tr className='text-center'>
                            <th scope='col'>NPM</th>
                            <th scope='col'>Nama</th>
                            <th scope='col'>Alamat</th>
                            <th scope='col'>Jenis Kelamin</th>
                            <th scope='col'>Hobi</th>
                          </tr>
                          </table>
                  {mahasiswa.data[item].length !== 0 ? (
                    mahasiswa.data[item].map((listMahasiswa, index) => (
                      <div key={index}>
                        <table className='table table-striped table-bordered' >
                          <tr className='text-center'>
                            <td>{mahasiswa.tahun_masuk.substring(2, 4) + (parseInt(mahasiswa.tahun_masuk.substring(2, 4)) + 4) + prodi.kode_prodi + '00' + parseInt('00') + parseInt(index + 1)}</td>
                            <td>{listMahasiswa.nama}</td>
                            <td>{listMahasiswa.alamat}</td>
                            <td>{listMahasiswa.jenis_kelamin}</td>
                            <td>
                              <span>{listMahasiswa.hobi ? `  ${listMahasiswa.hobi}` : ''}</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                    ))
                  ) : (
                    <p key={item}>Tidak ada Mahasiswa yang mengambil kelas ini.</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
