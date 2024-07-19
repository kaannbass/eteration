// __tests__/HomeTabs.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeTabs from '../src/navigation/AppNavigator'; 
import { CartProvider } from '../src/context/CartContext';

// Test sağlayıcısı
const TestProvider: React.FC = ({ children }) => (
    <CartProvider>
        {children}
    </CartProvider>
);

describe('HomeTabs', () => {
    it('should render the tab navigator with correct initial screen', () => {
        const { getByText } = render(
            <TestProvider>
                <HomeTabs />
            </TestProvider>
        );

        // Test etmek istediğiniz metin veya ekran içeriğini güncelleyin
        // Örneğin, HomeScreen'deki bir başlık veya metin
        expect(getByText('Home')).toBeTruthy(); 
    });

    it('should display cart badge when there are items in the cart', () => {
        // CartProvider'ı uygun şekilde yapılandırarak test yapabilirsiniz
        const { getByTestId } = render(
            <TestProvider>
                <HomeTabs />
            </TestProvider>
        );

        // Cart badge'in doğru şekilde render edilip edilmediğini kontrol edin
        const cartBadge = getByTestId('cart-badge'); // Test ID'nizi kullanın
        expect(cartBadge).toBeTruthy(); 
    });
});
