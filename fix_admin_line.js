const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, 'app', '(admin)', 'dashboard.tsx');
let lines = fs.readFileSync(dashboardPath, 'utf8').split('\n');

let newLines = [];
let skip = false;
for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('pendingProviders.map((provider, index) => (')) {
        skip = true;
        // Inject the new code
        newLines.push("            pendingProviders.map((provider, index) => (");
        newLines.push("              <React.Fragment key={provider.id}>");
        newLines.push("                {index > 0 && <View style={styles.divider} />}");
        newLines.push("                <View style={styles.pendingCard}>");
        newLines.push("                  <View style={styles.pendingCardHeader}>");
        newLines.push("                    <View style={styles.providerAvatar}>");
        newLines.push('                      <Ionicons name="storefront-outline" size={24} color={colors.primary} />');
        newLines.push("                    </View>");
        newLines.push("                    <View style={styles.pendingCardInfo}>");
        newLines.push("                      <Text style={styles.providerName}>{provider.name}</Text>");
        newLines.push("                      <Text style={styles.providerDetails}>{provider.speciality || 'Home Food'} • {provider.rating ? `★ ${provider.rating}` : 'New'}</Text>");
        newLines.push("                    </View>");
        newLines.push("                  </View>");
        newLines.push("                  <View style={styles.verificationBadge}>");
        newLines.push("                    <Text style={styles.verificationText}>Pending Verification</Text>");
        newLines.push("                  </View>");
        newLines.push("                  <Button ");
        newLines.push('                    title="Approve Provider"');
        newLines.push("                    onPress={() => approveProvider(provider.id)}");
        newLines.push('                    size="md"');
        newLines.push("                  />");
        newLines.push("                </View>");
        newLines.push("              </React.Fragment>");
        newLines.push("            ))");
        newLines.push("          )}");
    } else if (skip && lines[i].includes(')}')) {
        skip = false;
    } else if (!skip) {
        newLines.push(lines[i]);
    }
}

fs.writeFileSync(dashboardPath, newLines.join('\n'), 'utf8');
console.log('Admin dashboard card updated.');
