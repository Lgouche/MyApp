import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: '#D57C48',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  noSummaryText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
  },
  summary: {
    backgroundColor: '#895232',
    margin: 10,
    padding: 20,
    width: '85%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 12,
    padding: 2,
  },
  duplicateButton: {
    position: 'absolute',
    top: 10,
    right: 40,
    backgroundColor: 'blue',
    borderRadius: 12,
    padding: 2,
  },
  summaryText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  textTitleTipe: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  carnesText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
    alignSelf: 'flex-end',
  },
  baseText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
    alignSelf: 'flex-end',
  },
  totalContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    marginTop: 10,
    padding: 10,
    width: '50%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#D57C48',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalScrollContainer: {
    
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    marginStart:20,
    color: '#000',
  },
  button: {
    backgroundColor: '#895232',
    margin: 10,
    padding: 10,
    width: '80%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
  },
  buttonMini:{
    width: '30%'
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    width: '50%',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  llevarButton: {
    backgroundColor: '#9703b8',
    margin: 10,
    padding: 10,
    width: '40%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tomarButton: {
    backgroundColor: '#bf6ed1',
    margin: 10,
    padding: 10,
    width: '40%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  selectedButton: {
    borderColor: '#fff',
    borderWidth: 2,
  },
  summaryButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bebidaButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position:'relative'
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  padre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D57C48',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  tarjeta: {
    margin: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    borderColor: '#F39C12',
    borderWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cajaTexto: {
    paddingVertical: 5,
    backgroundColor: 'rgba(204, 204, 204, 0.6)',
    borderRadius: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  padreBoton: {
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#E67E22',
    paddingVertical: 20,
    borderRadius: 30,
    marginTop: 20,
    width: 130,
  },
  textoBotonInicio: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  textoBotonRegitro: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 70,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 5,
    width: '100%',
    backgroundColor: '#ccc',
    position: 'absolute',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activeLine: {
    height: '100%',
    width: '100%',
    backgroundColor: '#444',
    borderRadius: 5,
  },buttonSubText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  }, salsasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  salsaButton: {
    backgroundColor: '#895232',
    margin: 5,
    padding: 10,
    width: '45%', // Ancho de los botones para ajustarse en dos columnas
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
    alignItems: 'center',
  },
  selectedButton: {
    borderColor: '#fff',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
