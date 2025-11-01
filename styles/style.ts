import { Dimensions, StyleSheet } from 'react-native';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export const Splashstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,

  
  },
  topHalfBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: '#FFFFFF',
    zIndex: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden',
  },
  topHalfBackground: {
    width: '100%',
    height: '100%',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  logo: {
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  logoLetter: {
    fontSize: 42,
    fontWeight: '700',
    color: '#0B1F3A',
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  tagline: {
    marginTop: 6,
    fontSize: 14,
    color: '#C6D0E0',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 36,
  },
  footerText: {
    color: '#8FA3BF',
    fontSize: 12,
  },
  // Form & input styles
  formWrap: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A3B6B',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A3B6B',
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#274B82',
    borderWidth: 2,
  },
  inputError: {
    borderColor: '#D14343',
  },
  leftIcon: {
    marginRight: 8,
    color: '#0B1F3A',
  },
  textInput: {
    flex: 1,
    color: '#0B1F3A',
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  eyeIcon: {
    color: '#0B1F3A',
  },
  // Primary button styles



  primaryButton: {
    marginTop: 8,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1A3B6B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  linkRight: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  linkCenter: {
    alignSelf: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#C6D0E0',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 12,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1A3B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#1A3B6B',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334766',
  },
  dividerText: {
    color: '#C6D0E0',
    fontSize: 12,
    marginHorizontal: 8,
  },
  socialButton: {
    marginTop: 12,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  socialIcon: {
    color: '#DB4437',
    marginRight: 8,
  },
  socialButtonText: {
    color: '#0B1F3A',
  },
});

// Sighnup styles 
export const Sighnupstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,

  
  },
SighnuptopHalfBackground: {
 position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 0.2,
    backgroundColor: '#FFFFFF',
    zIndex: 0,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden',
},
RegLabel: {
marginTop: 60,
textAlign: 'center',
fontSize: 32,
fontWeight: '800',
color: '#FFFFFF',
letterSpacing: 0.5,
},
});



export const AddPropertystyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A3B6B',
  },
  scrollView: {
    maxHeight: '80%',
  },
  section: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
formRow: {
  flexDirection: 'row',
  position: 'relative',
  justifyContent: 'space-between',  // add this to space inputs evenly
  alignItems: 'center',             // vertically center inputs
  gap: 12,                         // add spacing between inputs (gap is supported in RN 0.71+)
},
 dropdown: {
  position: 'absolute',
  top: 50,
  left: 0,
  right: 0,
  backgroundColor: 'white',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  zIndex: 9999,
  elevation: 50,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  maxHeight: 200,
  overflow: 'hidden',
},

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  dropdownItemSelected: {
    backgroundColor: '#F8FAFC',
  },
  dropdownItemText: {
    color: '#2D3748',
    fontSize: 14,
  },
  fieldSpacing: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  imagesContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  addImageButton: {
    width: 120,
    height: 100,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addImageText: {
    marginTop: 4,
    fontSize: 12,
    color: '#4A5568',
  },
  imageCount: {
    fontSize: 10,
    color: '#A0AEC0',
    marginTop: 2,
  },
  imageWrapper: {
    width: 120,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  submitButton: {
    backgroundColor: '#1A3B6B',
  },
  cancelButtonText: {
    color: '#4A5568',
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    color: '#0B1F3A',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A3B6B',
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
});
